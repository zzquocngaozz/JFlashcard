export const role={
    email:{
        required:"Vui lòng nhập email",
        pattern:{
          value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message:'Email không hợp lệ!'
        }
      },
    password:{
      required:"Vui lòng nhập mật khẩu",
      pattern:{
        value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        message: "Mật khẩu phải có từ 8 ký tự bao gồm chữ hoa, chữ thường và chữ số"      
      }
    },
    fullname:{
        required:"Vui lòng nhập họ và tên",
        minLength:{
            value:4,
            message:'Họ và tên ít nhất có 4 ký tự'
        },
        maxLength:{
            value:30,
            message: 'Họ và tên dài nhất có 30 chữ cái'
        },
        pattern:{
            value:/^[^@#$%^&*()+=\[\]{}|;:'",<>/?\\]*$/,
            message:"Họ và tên không được chứa những ký tự đặc biệt"
        }
    },
    username:{
        required:"Vui lòng nhập tên tài khoản ",
        minLength:{
            value:4,
            message:'Tên tài khoản ít nhất có 4 ký tự'
        },
        maxLength:{
            value:30,
            message: 'Tên tài khoản dài nhất có 30 chữ cái'
        },
        pattern:{
            value:/^[^@#$%^&*()+=\[\]{}|;:'",<>/?\\]*$/,
            message:"Tên tài khoản không được chứa những ký tự đặc biệt"
        }
    }
}