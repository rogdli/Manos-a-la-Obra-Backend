const User = require('../model/User');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca al usuario en la base de datos.
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Verificar contraseña.
    const isMatch = password === user.password; 
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong pass' });
    }

    // Generar token (usando JWT).
    const token = jwt.sign(
      { userId: user._id, username: user.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '8h' }
    );

    // Éxito!
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server internal error', error: error.message });
  }
};

module.exports = { loginUser };