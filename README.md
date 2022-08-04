# ClassPlatform
**網址: https://classplatform.herokuapp.com/** 
<br>
**該專案主要是仿照一般大眾線上課程平台，任何有經註冊過的人皆能上傳課程成為講師或者成為學生觀看課程** 

**使用react作為前端網頁架構以及node.js作為伺服器連接資料庫**

## node.js: 處理請求以及撈取資料庫提供相關資料
### 使用到的技術及架構
1. mongoose atlas 資料庫
1. Joi: 先行檢驗使用者輸入內容有無符合規範，並於不符合規範的輸入返回警告值
```
validation.js

 const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(6).max(500).required(),
    url: Joi.string().min(25).max(60).required(),
  });
```
1. Jwt: 製作token，經檢驗驗證資格，若符合則於每次的req附加使用者資訊作為後續與伺服器應用
```
passport.js

 let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.JWTPASSWORD;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
```
1. Passport: 保護部分Router免於未經授權的使用者變更
```
index.js
 app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  CourseRoute
);
```
1. bcrypt進行帳戶密碼加密

## react: 前端網頁製作
### 使用到的技術及架構
1. props & state lifting: 把登入後的狀態同步至源頭，作為屬性傳下去給各需要使用的component應用
```
Login.js

 const Login = ({ currentUser, setCurrentUser }) => {
 ....
 
    AuthService.login(email, password, password2)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setCurrentUser(AuthService.getCurrentUser());
        window.alert("登入成功，現在幫你轉到個人頁面");
        navigate("/profile");
      })
  ...
  +
  App.js
   
  const App = () => {
    let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
      ...
        <Route
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
```
1. useEffect: 於狀態變更時同步顯現於頁面上(本身js讀取順序，修改state不會立即顯現)
```
Enroll.js
 
 useEffect(() => {
    if (currentUser) {
      CourseService.getCourseWithID(currentUser.user.course).then((item) => {
        try {
          setFoundUrl(item.data.url.match(/v=(.*)/)[1]);
        } catch (e) {}
        try {
          setFoundUrl(item.data.url.match(/youtu.be\/(.*)/)[1]);
        } catch (e) {}
        setGood(item.data.good.length);
        setBad(item.data.bad.length);
        setCourseData(item.data);
      });
    }
  }, []);
```
1.[].concat(state) + array.sort(): 參考使用react排序state作法，解決本專案按讚數及註冊人數的排序
https://stackoverflow.com/questions/43572436/sort-an-array-of-objects-in-react-and-render-them

    ```
    Search.js
 
    const sortGood = () => {
    let temp = [].concat(courseData);
    setCourseData(
      temp.sort((a, b) => (a.good.length > b.good.length ? -1 : 1))
    );
  };
```
 *原先使用自定義函數進行排序，不知為何於react中無法順利進行，待考證* 

1. scss使用RWD: flex-item + media screen
