const utcNow = new Date().toUTCString();

function User({
  id,
  cpf,
  salt,
  name,
  email,
  password,
  created_at = utcNow,
  updated_at = utcNow,
} = {}) {
  this.id = id;
  this.cpf = cpf;
  this.salt = salt;
  this.name = name;
  this.email = email;
  this.password = password;
  this.created_at = created_at;
  this.updated_at = updated_at;
}

User.prototype.view = function () {
  return {
    id: this.id,
    cpf: this.cpf,
    name: this.name,
    email: this.email,
    created_at: this.created_at,
    updated_at: this.updated_at,
  };
};

module.exports = User;
