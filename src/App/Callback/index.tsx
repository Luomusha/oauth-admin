import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { post } from "../../common/fetch";
import { CLIENT_ID, REDIRECT_URI } from "../../common/config";
import { Token } from "../../types";

export default () => {
    const [searchParams] = useSearchParams();
    const navigator = useNavigate()
    const { trigger, data, error } = useSWRMutation('/api/login', post)

    useEffect(() => {
        const code = searchParams.get("code")
        if (code) trigger({
            code,
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            grantType: "authorization_code"
        }).then((res: Token) => {
            localStorage.setItem("TOKEN", JSON.stringify(res))
            navigator("/")
        })
    }, [searchParams])
    return <div>
        ... ...
    </div>

}



// import useSWRMutation from 'swr/mutation'

// // 实现 fetcher
// // 额外的参数可以通过第二个参数 `arg` 传入
// // 在下例中，`arg` 为 `'my_token'`
// async function updateUser(url: string, { arg }: { arg: string }) {
//     await fetch(url, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${arg}`
//         }
//     })
// }

// function Profile() {
//     // 一个类似 useSWR + mutate 的 API，但是它不会自动发送请求
//     const { trigger } = useSWRMutation('/api/user', updateUser)

//     return <button onClick={() => {
//         // 以特定参数触发 `updateUser` 函数
//         trigger('my_token')
//     }}>Update User</button>
// }