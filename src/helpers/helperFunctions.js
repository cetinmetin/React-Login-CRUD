module.exports = {
   generateToken(user) {
      var jwt = require('jsonwebtoken')
      var token
      var u = {
         name: user.first_name,
         lastname: user.last_name,
         id: user.id.toString(),
         birthdate: user.birth_date
      };
      token = jwt.sign(u, process.env.REACT_APP_JWT_SECRET, {
         expiresIn: '24h' // expires in 24 hours
      });
      return token
   },

   transformJSONArrayToJSONObject(data) {
      var transformedObject = {};
      for (var i = 0; i < data.length; i++) {
         transformedObject[data[i].name] = data[i];
      }
      return transformedObject;
   },
   taskDetails(reportDate) {
      var tempDataSource = []
      var localStorageDataSource
      var AutoCorrection = require('../mockDatas/Autocorrection.json')
      var AutoCorrectionDetail = require('../mockDatas/AutocorrectionDetail.json')
      var Technology = require('../mockDatas/Technology.json')
      var Vendor = require('../mockDatas/Vendor.json')
      var moment = require('moment')

      if (JSON.parse(localStorage.getItem('dataSource')).length > 0)
         localStorageDataSource = JSON.parse(localStorage.getItem('dataSource'))
      else
         localStorageDataSource = AutoCorrection
      localStorageDataSource.map((data, index) => {
         AutoCorrectionDetail.map((detailData) => {
            if (detailData.autocorrection_id == data.id && moment(data.created_date).isAfter(reportDate)) {
               tempDataSource.push(detailData)
            }
         })

      })
      tempDataSource.forEach((dataSource, index) => {
         Technology.map((data) => {
            if (dataSource.technology == data.id)
               tempDataSource[index].technology = data.name
         })
         Vendor.map((data) => {
            if (dataSource.vendor == data.id)
               tempDataSource[index].vendor = data.name
         })
      })
      return tempDataSource
   },
   
   dateFormatter(date) {
      date = new Date(date)
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()

      var formattedDate = day + '/' + (month + 1) + '/' + year;
      return formattedDate
   },

   CRUDForJSON(CRUDType, newData, selectedRowForEdit) {
      const datas = JSON.parse(localStorage.getItem("dataSource"));
      const Swal = require('sweetalert2')

      var nameIsUsed = false
      if (CRUDType == 'add') {
         //name validation
         datas.map((data) => {
            if (newData.name === data.name) {
               nameIsUsed = true
            }
         })
         if (!nameIsUsed)
            localStorage.setItem("dataSource", JSON.stringify([...datas, newData]));
         else
            Swal.fire({
            title: 'Error!',
            text: 'The name is exist',
            icon: 'error',
            confirmButtonText: 'OK'
            })

      }
      else if (CRUDType == 'edit') {
         let localStorageDataSource = JSON.parse(localStorage.getItem('dataSource'))
         var notFoundForEdit = true
         var foundedIndex = -1
         console.log(selectedRowForEdit)
         if (selectedRowForEdit == '' || selectedRowForEdit == null) {
            localStorageDataSource.map((data, index) => {
               if (data.id == newData.id) {
                  notFoundForEdit = false
                  foundedIndex = index
               }
            })
            if (notFoundForEdit == false) {
               localStorageDataSource[foundedIndex] = newData
            }
            else
            Swal.fire({
               title: 'Error!',
               text: 'Invalid id',
               icon: 'error',
               confirmButtonText: 'OK'
               })
         }
         else {
            localStorageDataSource.map((data, index) => {
               if (data.id == newData.id) {
                  notFoundForEdit = false
                  foundedIndex = index
               }
            })
            if (notFoundForEdit == false) {
               localStorageDataSource[foundedIndex] = newData
            }
            else
            Swal.fire({
               title: 'Error!',
               text: 'Invalid id',
               icon: 'error',
               confirmButtonText: 'OK'
               })
         }
         localStorage.setItem("dataSource", JSON.stringify(localStorageDataSource));
      }
      else if (CRUDType == 'delete') {
         datas.map((data, index) => {
            if (newData === data.id) {
               datas.splice(index, 1)
            }
         })
         localStorage.setItem("dataSource", JSON.stringify(datas));
      }
   },
   dataOperations() {
      var AutoCorrectionDatas = require('../mockDatas/Autocorrection.json')
      var OperationTypeData = require('../mockDatas/OperationTypeData.json')

      var dataSource
      if (JSON.parse(localStorage.getItem('dataSource')) == null)
         dataSource = AutoCorrectionDatas
      else
         dataSource = JSON.parse(localStorage.getItem('dataSource'))
      dataSource.map((element, index) => {
         for (let i = 0; i < OperationTypeData.length; i++) {
            if (element.operation_type == OperationTypeData[i].id)
               dataSource[index].operation_type = OperationTypeData[i].name
         }
      })
      localStorage.setItem("dataSource", JSON.stringify(dataSource));
   },
   //   regenerateToken(user) {
   //     console.log(user)
   //     var jwt = require('jsonwebtoken')
   //     var token
   //     var u = {
   //      name: user.name,
   //      lastname: user.lastname,
   //      id: user.id.toString(),
   //      birthdate: user.birthdate
   //     };  
   //     token = jwt.sign(u, process.env.REACT_APP_JWT_SECRET, {
   //        expiresIn: '24h' // expires in 24 hours
   //     }); 
   //     return token
   //   },
   //   jwtTokenExpireControl(){
   //     var jwt = require('jsonwebtoken')
   //     var isExpired = false;
   //     const token = localStorage.getItem('token');
   //     if(token){
   //     var decodedToken = jwt.decode(token, {complete: true});
   //     var dateNow = new Date();

   //         if(decodedToken.exp < dateNow.getTime()){
   //             isExpired = true;
   //             this.logout()
   //         }
   //     }
   //     else{
   //         this.logout()
   //     }

   //     return isExpired
   // },
   //  tokenVerify(){
   //     var jwt = require('jsonwebtoken')
   //     var token = localStorage.getItem('token');
   //     var toLogin
   //     if(token){
   //         const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
   //         if(!generateToken(decodedToken) === token){
   //             this.logout()
   //         }
   //     }
   //     else{
   //         this.logout()
   //     }
   // },
   // logout(){
   //     var toLogin
   //     localStorage.removeItem('token');
   //     localStorage.setItem('isLoggedIn', false);
   //     toLogin = true
   //     return toLogin
   // }
}