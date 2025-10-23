const jwt = require('jsonwebtoken');

function requireAuth(req,res,next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ error: 'No token' });
  const parts = auth.split(' ');
  if(parts.length !== 2) return res.status(401).json({ error: 'Invalid auth header' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    next();
  } catch(err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { requireAuth };
