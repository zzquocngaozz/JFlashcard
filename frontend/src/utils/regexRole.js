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
        message: "Mật khẩu phải có từ 8 ký tự chỉ bao gồm chữ hoa, chữ thường và chữ số"      
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
            value:/^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\|\/\-][^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\\|\/\-]*[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\\|\/\-]$/,
            message:"Họ và tên không được chứa những ký tự đặc biệt và ký tự trắng thừa"
        }
    },
    firstName:{
        required:"Vui lòng nhập họ",
        minLength:{
            value:2,
            message:'Họ ít nhất có 2 ký tự'
        },
        maxLength:{
            value:30,
            message: 'Họ dài nhất có 30 chữ cái'
        },
        pattern:{
            value:/^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\|\/\-][^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\\|\/\-]*[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\\|\/\-]$/,
            message:"Họ không được chứa những ký tự đặc biệt và ký tự trắng thừa"
        }
    },
    lastName:{
        required:"Vui lòng nhập tên",
        minLength:{
            value:2,
            message:'Tên ít nhất có 2 ký tự'
        },
        maxLength:{
            value:30,
            message: 'Tên dài nhất có 30 chữ cái'
        },
        pattern:{
            value:/^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\|\/\-][^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\\|\/\-]*[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\\|\/\-]$/,
            message:"Tên không được chứa những ký tự đặc biệt và ký tự trắng thừa"
        }
    },
    userName:{
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
            value:/^[a-zA-Z0-9]+$/,
            message:"Tên tài khoản chỉ chứa chữ và số"
        }
    },
    token:{
        required:"Vui lòng nhập mã xác nhận",
        minLength:{
            value:6,
            message:'Mã xác nhận có 6-8 ký tự'
        },
        maxLength:{
            value:8,
            message: 'Mã xác nhận có 6-8 ký tự'
        },
        pattern:{
            value:/^[a-zA-Z0-9]+$/,
            message:"Mã xác nhận chỉ có chữ và số"
        }
    }
}