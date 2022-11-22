const User = require('../models/User')

module.exports = { //Read section below here
    index:  async (req, res) => {
      try {
        const users = await User.find()
        if(users.length > 0){
            res.status(200).json({
                status: true,
                data: users,
                method: req.method,
                url: req.url
            })
        }else{
            res.json({
                status: false,
                message: "Data still empty"
            })
        }
      } catch (error) {
            res.status(400).json({success: false})
      }
        
    },
    //Get a User
    show: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            res.json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: "Data successfully retrieved"
            })

        } catch (error) {
            res.status(400).json({success: false})
        }
    
    },
    
     //Add section below here
    store: async (req, res) => {
        try {
            const users = await User.create(req.body)
            res.status(200).json({
                status: true,
                data: users,
                method: req.method,
                url: req.url,
                message: "Data successfully added"
            })
        } catch (error) {
            res.status(400).json({success: error})
        }
        
    }, //Update section below here
    update: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            res.json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: "Data successfully updated"
            })

        } catch (error) {
            res.status(400).json({success: false})
        }
    
    }, //Delete section below here
    delete: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.json({
                status: true,
                method: req.method,
                url: req.url,
                message: "Data successfully deleted"
            })

        } catch (error) {
            res.status(400).json({success: false})
        }
    }
}