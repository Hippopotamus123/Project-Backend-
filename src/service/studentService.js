// const { Promise } = require('mongoose');
const studentModel = require('../model/studentModel');
var userModel=require('../model/studentModel');
var key="123456789brbrbrbrbrbbr";
var encryptor= require('simple-encryptor')(key);
const { Promise } = require('es6-promise');
const { default: mongoose } = require('mongoose');





module.exports.createStudentDBService = (studentDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      var studentModelData = new userModel();

      studentModelData.firstname = studentDetails.firstname;
      studentModelData.lastname = studentDetails.lastname;
      studentModelData.email = studentDetails.email;
      studentModelData.role = studentDetails.role;
      studentModelData.phoneNumber = studentDetails.phoneNumber;
      // Encrypt password
      var encrypted = encryptor.encrypt(studentDetails.password);
      studentModelData.password = encrypted;

      const result = await studentModelData.save();
      if (result) {
        resolve(true);
      } else {
        reject(new Error("Failed to save student data."));
      }
    } catch (error) {
      console.error("Error while saving student data: ", error);
      reject(new Error("Failed to save student data."));
    }
  });
};

module.exports.loginStudentDBService = (studentDetails) => {
    return studentModel.findOne({ email: studentDetails.email })
      .exec()
      .then((result) => {
        if (result != undefined && result != null) {
          var decrypted = encryptor.decrypt(result.password);
          if (decrypted == studentDetails.password) {
            return { status: true, msg: "Student validated Successfully"};
          } else {
            throw { status: false, msg: " Student validated failed" };
          }
        } else {
          throw { status: false, msg: "student error details" };
        }
      })
      .catch((error) => {
        throw { status: false, msg: "invalid Data" };
      });
  };
  module.exports.updateStudentDBService = (id, updateDetails) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await userModel.findByIdAndUpdate(id, updateDetails, { new: true });
  
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Impossible de mettre à jour l'utilisateur."));
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour d'un utilisateur. ", error);
        reject(new Error("Impossible de mettre à jour l'utilisateur."));
      }
    });
  };
  




  



















// module.exports.createStudentDBService = (studentDetails) => {
//     return new Promise((resolve, reject) => {
//       const studentModelData = new userModel({
//         firstname: studentDetails.firstname,
//         lastname: studentDetails.lastname,
//         email: studentDetails.email,
//         password: encryptor.encrypt(studentDetails.password),
//       });
      
//       studentModelData.save((error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   };
  
