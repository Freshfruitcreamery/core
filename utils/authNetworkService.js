const config = require('../config/sysConfig');
const axios = require('axios').default;

// const {PRODUCT_CODE_CORE, PRODUCT_CODE_MAIN} = require('../config/sysConfig');

const AuthCall = axios.create({
  baseURL: config.AUTH_SERVICE_URL,
  // timeout: config.HTTP_TIMEOUT,
  headers: { 'content-type': 'application/json' },
});
AuthCall.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Return all api responses and not throw them as errors
    if (error.response) return error.response;
    throw error;
  }
);

/**
 * verify account
 * @param {*} token
 * @param {*} product_code
 * @returns
 */
exports.authenticate = async (token, product_code) => {
  const response = await AuthCall({
    url: `/auth/verify`,
    method: 'POST',
    data: { product_code },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * initiate password reset
 * @param {*} data
 * @returns
 */
exports.forgotPassword = async (data) => {
  const response = await AuthCall({
    url: `/auth/send`,
    method: 'POST',
    data: { ...data },
  });
  return response.data;
};

/**
 * verify password reset
 * @param {*} token
 * @returns
 */
exports.verifyPasswordToken = async (token) => {
  const response = await AuthCall({
    url: `/auth/verify/reset`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Reset user's account password
 * @param {*} token
 * @param {*} data
 * @returns
 */
exports.resetPassword = async (token, data) => {
  const response = await AuthCall({
    url: `/auth/password/reset`,
    method: 'POST',
    data: { ...data },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Reset user's account password [authorized]
 * @param {*} token
 * @param {*} data
 * @returns
 */
exports.resetPasswordAuth = async (token, data) => {
  const response = await AuthCall({
    url: `/auth/reset`,
    method: 'POST',
    data: { ...data },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Create user's account
 * @param {*} body
 * @returns
 */
exports.createUser = async (body) => {
  const response = await AuthCall({
    url: '/user/create',
    method: 'POST',
    data: { ...body },
  });

  return response.data;
};

/**
 * Login user
 * @param {*} data
 * @returns
 */
exports.login = async (data) => {
  const response = await AuthCall({
    url: '/auth/signin',
    method: 'POST',
    data: { ...data },
  });

  return response.data;
};

/**
 * Verify user's account and activate through access token
 * @param {*} token
 * @returns
 */
exports.verifyAccount = async (token) => {
  const response = await AuthCall({
    url: 'auth/verify/email',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * activate user's account
 * @param {*} user_id
 * @param {*} token
 * @param {*} product_code
 * @returns
 */
exports.activateAccount = async (user_id, token, scope, product_code) => {
  const response = await AuthCall({
    url: `auth/activate/${user_id}?scope=${scope}`,
    method: 'PUT',
    data: { product_code },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * deactivate user's account
 * @param {*} user_id
 * @param {*} token
 * @param {*} product_code
 * @returns
 */
exports.deactivateAccount = async (user_id, token, scope, product_code) => {
  const response = await AuthCall({
    url: `auth/deactivate/${user_id}?scope=${scope}`,
    method: 'PUT',
    data: { product_code },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * update user's account
 * @param {*} token
 * @param {*} data
 * @returns
 */
exports.updateAccount = async (token, data) => {
  const response = await AuthCall({
    url: `/user/update`,
    method: 'POST',
    data: { ...data },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * update user's account by ID
 * @param {*} token
 * @param {*} data
 * @returns
 */
exports.updateAccountByID = async (token, data, id) => {
  const response = await AuthCall({
    url: `/user/update/${id}`,
    method: 'PUT',
    data: { ...data },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * delete user's account
 * @param {*} token
 * @param {*} user_id
 * @param {*} product_code
 * @returns
 */
exports.deleteUser = async (token, user_id, scope, product_code) => {
  const response = await AuthCall({
    url: `/user/remove/${user_id}?code=${product_code}&scope=${scope}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * view users
 * @param {*} token
 * @param {*} product_code
 * @returns
 */
exports.getUsers = async (token, scope, product_code, user_product_code) => {
  const response = await AuthCall({
    url: `/user/all?code=${product_code}&user_code=${user_product_code}&scope=${scope}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * view user
 * @param {*} user_id
 * @param {*} token
 * @returns
 */
exports.getUser = async (user_id, scope, token) => {
  const response = await AuthCall({
    url: `/user/${user_id}?scope=${scope}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
