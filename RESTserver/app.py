from flask import Flask, jsonify, request, session, redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from functools import wraps
from flask import abort

app=Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///RESTdata.db'

db=SQLAlchemy(app)

class Users(db.Model, UserMixin):
    id= db.Column(db.Integer, primary_key=True)
    email= db.Column(db.String(128), nullable=False, unique = True)
    username = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='user')
    blocked = db.Column(db.Boolean, default=False)

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    score = db.Column(db.Text, nullable=False)
    date = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    blocked = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.email,
            'message': self.message,
            'score' : self.score,
            'date' : self.date,
            'user_id' : self.user_id,
            'blocked' : self.blocked
        }

app.config['SECRET_KEY']='2d75155246883f023ee10d89cfae0663e3515f9a'

manager=LoginManager(app)

@manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or current_user.role != 'admin':
            abort(403)
        return f(*args, **kwargs)
    return decorated_function

@app.get('/api/admin/users')
@login_required
@admin_required
def api_admin_users():
    users = Users.query.order_by(Users.id.asc()).all()

    return jsonify({
        "users": [
            {
                "id": u.id,
                "email": u.email,
                "username": u.username,
                "role": u.role,
                "blocked": u.blocked,
                "is_self": u.id == current_user.id
            }
            for u in users
        ]
    })

@app.route('/api/admin/delete/<int:user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    user = Users.query.get_or_404(user_id)
    if user.id == current_user.id:
        abort(403)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/admin/users/<int:user_id>/block', methods=['PUT'])
@admin_required
def block_user(user_id):
    user = Users.query.get_or_404(user_id)
    if user.id == current_user.id:
        abort(403)
    user.blocked = True
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/admin/users/<int:user_id>/unblock', methods=['PUT'])
@admin_required
def unblock_user(user_id):
    user = Users.query.get_or_404(user_id)
    user.blocked = False
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    feedback = Feedback.query.all()
    return jsonify([f.serialize() for f in feedback])

@app.route('/api/feedback', methods=['POST'])
def create_feedback():
    data = request.get_json()
    new_feedback = Feedback(email=data['email'], message=data['message'],score=data['rating'], date = data['date'], user_id = data['user_id'])
    db.session.add(new_feedback)
    db.session.commit()
    return jsonify(new_feedback.serialize()), 201

@app.route('/api/feedback/<int:feedback_id>', methods=['DELETE'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    if not feedback:
        return jsonify({'message': 'Feedback not found'}), 404
    db.session.delete(feedback)
    db.session.commit()
    return '', 204

@app.route('/api/feedback/block/<int:feedback_id>', methods=['PUT'])
def block_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    if not feedback:
        return jsonify({'error': 'Отзыв не найден'}), 404

    feedback.blocked = True
    db.session.commit()

    return jsonify({'message': 'Отзыв заблокирован', 'feedback': feedback.serialize()})

@app.route('/api/feedback/unblock/<int:feedback_id>', methods=['PUT'])
def unblock_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    if not feedback:
        return jsonify({'error': 'Отзыв не найден'}), 404

    feedback.blocked = False
    db.session.commit()

    return jsonify({'message': 'Отзыв разблокирован', 'feedback': feedback.serialize()})

@app.route('/api/profile', methods=['GET'])
@login_required
def get_profile():
    user = Users.query.get(current_user.id)
    if user is None:
        return jsonify({'message': 'Пользователь не найден'}), 404
    
    profile = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role,
        'blocked': user.blocked
    }

    return jsonify(profile), 200

@app.route('/api/profile/<int:profile_id>', methods=['PUT'])
@login_required
def update_profile(profile_id):
    if profile_id != current_user.id:
        return jsonify({'message': 'Невозможно обновить профиль неавторизованного пользователя'}), 403

    user = Users.query.get(profile_id)
    if user is None:
        return jsonify({'message': 'Пользователь не найден'}), 404

    data = request.get_json()

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        if Users.query.filter(Users.email == data['email'], Users.id != profile_id).first():
            return jsonify({'message': 'Email already in use'}), 400
        user.email = data['email']

    db.session.commit()

    profile = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
    }
    return jsonify(profile), 200

@app.route("/api/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return {"data": ["OK"]}

@app.route('/api/signin', methods=['POST'])
def login_page():
    if request.method == 'POST':
        item = request.get_json()
        email = item['email']
        password = item['password']
        if email and password:
            user = Users.query.filter_by(email=email).first()
            if user.blocked == True:
                return jsonify({'success': False, 'error': 'Пользователь заблокирован'}), 201
            if user and check_password_hash(user.password, password):
                login_user(user)
                return jsonify({'success': True, 'message': 'Вход успешен'}), 200
                
            else:
                return jsonify({'success': False,'message': 'Неверный логин или пароль'}), 201
        else:
            return jsonify({'success': False,'message': 'Заполните поля для входа'}), 201
        

@app.route('/api/session')
@login_required
def auth():
    if current_user.is_authenticated:
        return jsonify({'authenticated': True, 'user_id': current_user.id})
    else:
        return jsonify({'authenticated': False})

@app.route("/api/signup", methods = ["POST"])
def signup():
    if request.method == 'POST':
        item = request.get_json()
        name = item['name']
        email = item['email']
        password = item['password']
        print(item)
        if not ( password or email or name):
            return jsonify({'success': True, 'message': 'Пожалуйста заполните поля'}), 201
        else:
            hash_pwd=generate_password_hash(password)
            new_user=Users(password = hash_pwd, email=email, username = name)
            try:
                db.session.add(new_user)
                db.session.commit()
                return jsonify({'success': True, 'message' : 'Пользователь зарегестрирован'}), 201
            except:
                return jsonify({'success': False, 'message': 'Ошибка при регистрации пользователя'}), 201
    else:
        return jsonify({'success': False, 'message': 'Ошибка'}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)