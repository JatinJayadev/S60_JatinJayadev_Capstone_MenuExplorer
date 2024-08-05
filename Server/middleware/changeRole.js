import React from 'react'

const changeRole = (newRole) => {
    const userId = req.userId

    User.findByIdAndUpdate(userId, { role: newRole })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).send({ message: "User role updated successfully", user });
            next()
        })
        .catch((err) => {
            res.status(500).send({ message: "Error updating user role", error: err });
        });
}

export default changeRole