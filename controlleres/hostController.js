var hostModel = require("../models/hostModel");

// get all
function getAllHosts() {
  return hostModel.find().populate("userId");
}

// post host
function saveHost(host) {
  return hostModel.create(host);
}

// Get host by id
async function getHostBYID(id, res) {
  try {
    var host = await hostModel.findOne({ _id: id });
    if (host) {
      res.status(200).json({ hosts: host });
    } else {
      res.status(400).json({ message: "Error Not Find host" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

// update host info
async function UpdateHostIfo(
  res,
  id,
  name,
  address,
  price,
  numberOfRooms,
  numberOfBedrooms,
  guestNumber,
  images,
  category,
  comment,
  description,
  currencySymbol
) {
  try {
    var host = await hostModel.findByIdAndUpdate({
      name,
      address,
      price,
      numberOfRooms,
      numberOfBedrooms,
      guestNumber,
      images,
      category,
      comment,
      description,
      currencySymbol,
    });
    if (host) {
      host.name = name;
      host.address = address;
      host.price = price;
      host.numberOfBedrooms = numberOfBedrooms;
      host.numberOfRooms = numberOfRooms;
      host.guestNumber = guestNumber;
      host.images = images;
      host.category = category;
      host.comment = comment;
      host.description = description;
      host.currencySymbol = currencySymbol;
      res.status(200).json({ hosts: host });
    } else {
      res.status(400).json({ message: "Error Not Find host" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

// delete host
async function deleteHost(id, res) {
  try {
    var host = await hostModel.findByIdAndDelete({ _id: id });
    if (host) {
      res.status(200).json({ hosts: host });
    } else {
      res.status(400).json({ message: "Error Not Find host" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
module.exports = {
  getAllHosts,
  saveHost,
  getHostBYID,
  UpdateHostIfo,
  deleteHost,
};
