export const farmResponse = (farm) => {
  return {
    id: farm._id,
    name: farm.name,
    owner: farm.owner,
    location: farm.location,
    size: farm.size,
    geolocation: farm.geolocation,
  };
};

export const userResponse = (user) => {
  return {
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
