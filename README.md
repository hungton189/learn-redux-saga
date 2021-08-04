+ `Effect`: là 1 js object chứa thông tin để  saga middleware biết cần phải làm gì.
+ `Effect creator ` là 1 function trả về 1 effect. Người thực thi là saga middleware.
+ Một số  effect creator: https://redux-saga.js.org/docs/api#effect-creators


+ Các cách navigation:
1. Lắng nghe ở Effect: sử dụng 1 biến như isLogged lưu ở saga, app component lắng nghe,nếu isLogged = true thì Redirect
=> Không được khuyến khích sử dụng vì nếú có nhiều biến như isLogged thì sẽ loạn, và sẽ khó control được code (logic đặt tại 2 nơi khác nhau)  

2. Truyền callback vào trong dispatch.
Ví dụ:
dispatch(authActions.login({
    ...values,
    onSuccess:()=>{//TODO}
    onError:()=>{//TODO}
}))
=> Không được khuyến khích bởi Redux-toolkit vì NON-SERIALIZABLE

3. Sử dụng connected-react-router
(https://github.com/supasate/connected-react-router)
+ Đồng bộ routing và redux-store
+ Hỗ trợ chuyển trang bằng cách dispatch action
+ Mỗi lần thay đổi routing thì sẽ cập nhật redux => PHẢI ĐẢM BẢO khi thay đổi routing thì không bị ảnh hưởng tới các component khác