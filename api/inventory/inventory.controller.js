const {
  DbCreateStockDetails,
  DbCreateInventory,
  DbGetInventory,
  DbgetInventories,
  DbDeleteInventory,
  DbUpdateInventory,
  DbNameInventory,
} = require("./inventory.service");

module.exports = {
  createInventory: (req, res) => {
    if (!req.body || !req.body.title || !req.body.price || !req.body.size) {
      return res.status(500).json({
        success: 0,
        message: "please provide required data",
      });
    }
    DbNameInventory(req.body.title, (error, result) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "database error",
        });
      }
      if (result) {
        return res.status(500).json({
          success: 0,
          message: "same inventory already exist",
        });
      } else {
        DbCreateInventory(req.body, (error, result) => {
          if (error) {
            return res.status(500).json({
              success: 0,
              message: "database in adding inventory",
            });
          } else {
            DbCreateStockDetails(result.insertId, (error, result) => {
              if (error) {
                return res.status(500).json({
                  success: 0,
                  message: "database in adding stock entry",
                });
              }
              else{
                return res.json({
                    success: 1,
                    message: "inventory created successfully",
                  });
              }
            });
            
          }
        });
      }
    });
  },

  updateInventory: (req, res) => {
    var check = true;

    if (!req.body || !req.body.title || !req.body.price || !req.body.size) {
      return res.status(500).json({
        success: 0,
        message: "please provide required data",
      });
    }
    DbNameInventory(req.body.title, (error, result) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "database error",
        });
      }
      if (result) {
        if (result.id != req.body.id) {
          check = false;
        }
      }

      if (check) {
        DbUpdateInventory(req.body, (error, result) => {
          if (error) {
            return res.status(500).json({
              success: 0,
              message: "database in adding inventory",
            });
          } else {
            return res.json({
              success: 1,
              message: "inventory created successfully",
            });
          }
        });
      } else {
        return res.status(500).json({
          success: 0,
          message: "same inventory alreadt exist",
        });
      }
    });
  },

  getInventory: (req, res) => {
    DbGetInventory(req.body.id, (error, result) => {
      if (error || !result) {
        return res.status(404).json({
          success: 0,
          message: "database error in get inventory",
        });
      } else {
        return res.json({
          success: 1,
          data: result,
        });
      }
    });
  },

  deleteInventory: (req, res) => {
    DbDeleteInventory(req.body.id, (error, result) => {
      if (error || !result) {
        return res.status(404).json({
          success: 0,
          message: "database error in get inventory",
        });
      } else {
        return res.json({
          success: 0,
          message: "inventory deleted successfully",
        });
      }
    });
  },

  getInventories: (req, res) => {
    DbgetInventories((error, result) => {
      if (error || !result) {
        return res.status(404).json({
          success: 0,
          message: "database error in get inventories",
        });
      } else {
        return res.json({
          success: 1,
          data: result,
        });
      }
    });
  },
};
