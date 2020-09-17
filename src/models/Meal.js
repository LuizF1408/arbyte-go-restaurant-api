const utcNow = new Date().toUTCString();

function User({
  id,
  name,
  price,
  available = true,
  image_url,
  created_by,
  description,
  created_at = utcNow,
  updated_at = utcNow,
} = {}) {
  this.id = id;
  this.price = price;
  this.available = available;
  this.name = name;
  this.image_url = image_url;
  this.description = description;
  this.created_by = created_by;
  this.created_at = created_at;
  this.updated_at = updated_at;
}

module.exports = User;
