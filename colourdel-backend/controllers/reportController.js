exports.getReports = async (req, res) => {
  try {
    const user = req.user;
    return res.json(user.reports);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addReport = async (req, res) => {
  try {
    const { type, data } = req.body;
    if (!type || !data) return res.status(400).json({ message: 'type and data are required' });

    const user = req.user;
    user.reports.push({
      type,
      data,
      createdAt: new Date(),
    });

    await user.save();
    return res.status(201).json({ message: 'Report added' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};