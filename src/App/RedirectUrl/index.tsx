import { useEffect } from "react";

export default (props: { url: string }) => {
    useEffect(() => {
        window.location.replace(props.url)
    }, [props.url]);

    return <h5>Redirecting...</h5>;
};