const RoomActions = require('../actions/room_actions');

const SessionApiUtil = {
	logIn(user, success, error) {
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: { user },
			success,
			error(xhr) {
				const errors = xhr.responseJSON;

				error("login", errors);
			}
		});
	},

	logOut(success) {
		$.ajax({
			url: '/api/session',
			method: 'DELETE',
			success,
			error: function () {
			  console.log("Logout error in SessionApiUtil#logout");
			}
		});
	},

	signUp(user, success, error) {
		$.ajax({
			url: '/api/user',
			type: 'POST',
			dataType: 'json',
			data: { user },
			success(user) {
				success(user);
				[7, 6, 5, 4, 3, 2, 1].forEach(roomId => RoomActions.joinRoom(roomId));
			},
			error(xhr) {
				const errors = xhr.responseJSON;
				error("signup", errors);
			}
		});
	},

	demoIn(success, error) {
		$.ajax({
			url: '/api/guest',
			dataType: 'json',
			success(user) {
				success(user);
				[7, 6, 5, 4, 3, 2, 1].forEach(roomId => RoomActions.joinRoom(roomId));
			},
			error(xhr) {
				const errors = xhr.responseJSON;
				error("demoin", errors);
			}
		});
	}
};

module.exports = SessionApiUtil;
