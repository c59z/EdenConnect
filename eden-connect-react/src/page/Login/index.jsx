import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, replace } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { request, setToken, removeToken } from "../../utils";
import { useStore } from "../../store";
import { useNavigate } from "react-router-dom";

function Login() {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function login() {
    const loginData = {
      email: email,
      password: password,
    };
    request
      .post(`/auth/login`, loginData)
      .then((res) => {
        if (res.data.code === 200) {
          // 登录成功
          setToken(res.data.data.token);
          // 登录成功后获取用户信息存到mobx里面
          userStore.setUser(res.data.data.userInfo);
          navigate("/", { replace: true });
        } else {
          // 登录失败
          setErrorMessage(res.data.msg);
          setOpenErr(true);
        }
      })
      .catch((err) => {
        setErrorMessage("登录错误");
        setOpenErr(true);
      });
  }

  function closeErrAlert() {
    setOpenErr(false);
  }

  return (
    <>
      <Container maxWidth="xs">
        <Box className="login-box" sx={{ boxShadow: 3, p: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="邮箱"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <span role="img" aria-label="user icon">
                    📧
                  </span>
                ),
              },
            }}
          />
          <TextField
            label="密码"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <span role="img" aria-label="lock icon">
                    🔒
                  </span>
                ),
              },
            }}
          />
          <Button onClick={login} variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <a href="#" className="forgot-link">
              Forgot Password
            </a>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link to="/register" className="signup-link">
              Sign Up
            </Link>
          </Typography>
        </Box>
        {/* 错误消息栏 */}
        <Snackbar
          onClose={closeErrAlert}
          open={openErr}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={closeErrAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default Login;
