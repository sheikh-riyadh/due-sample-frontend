import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "../components/common/Input";
import SubmitButton from "../components/common/SubmitButton";
import only_head from "../assets/only-head.png";
import eyes_closed from "../assets/eyes-closed.png";
import eyes_off from "../assets/eyes_off.png";
import { useUserMutation } from "../store/services/userApi/auth_user_Api";
import { useDispatch } from "react-redux";
import { addUser } from "../store/features/user/userSlice";
import toast from "react-hot-toast";
import { useGetUser } from "../hooks/useGetUser";

const Login = () => {
  const [isOff, setIsOff] = useState(false);

  const { register, handleSubmit } = useForm();
  const [type, setType] = useState("text");
  const [userLogin, { isLoading }] = useUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useGetUser();

  const handleUserLogin = async (data) => {
    const res = await userLogin(data);
    if (res?.data?._id) {
      dispatch(addUser(res?.data));
      navigate("/");
    } else {
      toast.error("redentials do not match", { id: "error" });
    }
  };

  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [navigate, user?._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOff((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-svh relative">
      <div className="flex flex-col  items-center justify-center h-screen w-full my_container z-30 absolute">
        <div className="flex flex-col items-center justify-center bg-white border shadow-lg rounded-xl overflow-hidden w-[340px] h-[340px]">
          <form
            onSubmit={handleSubmit(handleUserLogin)}
            className="flex flex-col items-center justify-center gap-5 w-full p-7"
          >
            <div className="w-24 h-24 border rounded-full flex items-center justify-center overflow-hidden relative">
              <img
                className={`absolute w-full h-full object-contain p-1 transition-opacity duration-700 ${
                  type === "text" ? "opacity-100" : "opacity-0"
                }`}
                src={!isOff ? only_head : eyes_off}
                alt="bear"
              />
              <img
                className={`absolute w-full h-full transition-opacity duration-700 ${
                  type === "text" ? "opacity-0" : "opacity-100"
                }`}
                src={eyes_closed}
                alt="bear"
              />
            </div>

            <div className="w-full flex flex-col gap-5">
              <Input
                {...register("userName")}
                placeholder="User name *"
                type="text"
                required
                className="w-full"
                defaultValue="pathology"
              />
              <div className="flex items-center justify-between relative w-full overflow-hidden">
                <input
                  className="focus:outline-none bg-background w-full p-2 rounded"
                  {...register("password")}
                  type={type}
                  placeholder="***********"
                  onFocus={() => setType("password")}
                  onBlur={() => setType("text")}
                />
                <div className="absolute right-0">
                  <div
                    onClick={() =>
                      setType((prev) => (prev == "text" ? "password" : "text"))
                    }
                    className="p-2.5 flex items-end justify-end cursor-pointer"
                  >
                    {type == "text" ? (
                      <FaEye className="text-2xl font-bold h-full" />
                    ) : (
                      <FaEyeSlash className="text-2xl font-bold h-full" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <SubmitButton isLoading={isLoading} className="bg-blue-600">
              Sign In
            </SubmitButton>
          </form>
        </div>
      </div>
      {/* <img
        className="absolute top-0 h-screen w-full z-0"
        src={mountain}
        alt=""
      /> */}
    </div>
  );
};

export default Login;
