const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
  const user = req.user;
  return res.json({
    id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, phone, password } = req.body;

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};