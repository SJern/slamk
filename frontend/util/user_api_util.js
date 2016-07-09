const UserApiUtil = {
  fetchAllUsers(success) {
    $.ajax({
      url: 'api/users',
      success,
			error: function () {
			  console.log("error in UserApiUtil#fetchAllUsers");
			}
    });
  }
};

module.exports = UserApiUtil;
