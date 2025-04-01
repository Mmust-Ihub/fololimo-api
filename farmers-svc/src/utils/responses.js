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

// helllo

export const activityResponse = (activity) => {
  return {
    id: activity._id,
    farm: activity.farmId.name,
    title: activity.title,
    description: activity.description,
    startDate: activity.startDate,
    endDate: activity.endDate,
    status: activity.status,
    color: activity.color,
  };
};
