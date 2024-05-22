// Middleware to check user's branch and role
function checkBranchAccess(req, res, next) {
    const user = req.user; // Assume user info is added to req in an auth middleware
    const { branchID } = req.body;
  
    if (user.userType === 'staff' && user.branchID !== branchID) {
      return res.status(403).json({ message: 'Access to this branch is denied' });
    }
  
    next();
  }