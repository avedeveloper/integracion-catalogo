import User from "../model/Users.js";
import Role from "../model/Roles.js";


const isMoterator = async (req, res, next) => {
  if (req.user.role.includes("moderator", "admin")) {
    const user = await User.findById(req.user.id);
    const role = await Role.find({ name:{ $in: user.roles }});
    for (let i = 0; i < role.length; i++) {
      if (role[i].name === "moderator" || role[i].name === "admin") {
        next()
      };
    };
    next("You are not a moderator");
  } else {
    next("You are not a moderator");
  }
}

const isAdmin = async (req, res, next) => {
  if (req.user.role.includes("admin")) {
    const user = await User.findById(req.user.id);
    const role = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < role.length; i++) {
      if (role[i].name === "admin") {
        return next();
      }
    }
    next("You are not an admin");
  } else {
    next("You are not an admin");
  }
};

const isUser = async (req, res, next) => {
  if (req.user.role.includes("user", "moderator", "admin")) {
    const user = await User.findById(req.user.id);
    const role = await Role.find({ name: { $in: user.roles } });
    for (let i = 0; i < role.length; i++) {
      if (role[i].name === "user" || role[i].name === "moderator" || role[i].name === "admin") {
        next();
      }
    }
    next("You are not a user");
  } else {
    next("You are not a user");
  }
}

const isGuest = (req, res, next) => {
  if (req.user.role.includes("user", "moderator", "admin", "guest")) {
    next();
  } else {
    next("You are not a guest");
  }
}
export default { isMoterator, isAdmin, isUser, isGuest };