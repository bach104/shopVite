import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const usernameOrEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = () => {
    const errors = {};
    if (!usernameOrEmailRef.current.value) errors.usernameOrEmail = "Vui lòng nhập tên đăng nhập hoặc email.";
    if (!passwordRef.current.value) errors.password = "Vui lòng nhập mật khẩu.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await loginUser({
        usernameOrEmail: usernameOrEmailRef.current.value,
        password: passwordRef.current.value,
      }).unwrap();

      if (response.token) {
        dispatch(setUser({ user: response.user }));

        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);

        toast.success("Đăng nhập thành công!");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      const errorMsg = err?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setErrors((prev) => ({
        ...prev,
        usernameOrEmail: errorMsg.includes("Không tìm thấy") ? "Tên đăng nhập hoặc email không đúng." : prev.usernameOrEmail,
        password: errorMsg.includes("Mật khẩu không đúng") ? "Mật khẩu không đúng." : prev.password,
      }));
    }
  };

  return (
    <div className="Auth">
      <div className="boxLog shadow-black m-3 pb-3 rounded-md">
        <h1 className="font-bold px-3 py-2 rounded-t-md">Đăng nhập</h1>
        <form onSubmit={handleLogin} className="p-3 mt-2">
          <div className="form-control mb-3">
            <label htmlFor="usernameOrEmail">Tên đăng nhập hoặc email:</label>
            <input
              ref={usernameOrEmailRef}
              className="p-2 rounded-md mt-2 w-full"
              type="text"
              id="usernameOrEmail"
              placeholder="Nhập email hoặc tên đăng nhập"
              onBlur={() => validateInputs()}
            />
            {errors.usernameOrEmail && <p className="text-red-500 mt-1">{errors.usernameOrEmail}</p>}
          </div>

          <div className="form-control mb-3">
            <label htmlFor="password">Mật khẩu:</label>
            <div className="relative w-full">
              <input
                ref={passwordRef}
                className="p-2 w-full rounded-md mt-2 pr-10"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Nhập mật khẩu"
                onBlur={() => validateInputs()}
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                <i className={`fa-regular mt-2 ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
            </div>
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="bg-black text-white px-3 py-2 rounded-md w-full mt-3 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <span className="animate-spin border-t-2 border-white w-5 h-5 rounded-full"></span> : "Đăng nhập"}
          </button>

          <button
            type="button"
            className="bg-black text-white px-3 py-2 rounded-md w-full mt-3 gap-2 flex items-center justify-center"
          >
            <span>
              <i className="fa-brands fa-google"></i>
            </span>
            Đăng nhập bằng Google
          </button>
        </form>

        <p className="p-3">
          Bạn chưa có tài khoản? Ấn{" "}
          <Link className="font-bold" to="/register">
            đăng ký
          </Link>{" "}
          để tạo tài khoản
        </p>
      </div>
    </div>
  );
};

export default Login; 

