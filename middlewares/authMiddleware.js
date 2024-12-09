const jwt = require('jsonwebtoken');

// Mi único middleware local.

const authMiddleware = (req, res, next) => {
    // Extrae el token JWT del encabezado de autorización...
    const token = req.headers.authorization?.split(' ')[1];
    // ...divide el encabezado y toma el segundo elemento (Bearer -TOKEN-).

    if (!token) {
        return res.status(401).json({ message: 'No token, Im afraid youre NOT allowed here' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unvalid token' });
    }
};

module.exports = authMiddleware;