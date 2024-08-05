import { useState, useRef } from "react";
import saveAs from "file-saver";

export default function Qrcode() {
    const rUrl = useRef();

    const [url, setUrl] = useState("");
    const [qrcode, setQrcode] = useState("");

    const hUrl = (event) => { setUrl(event.target.value); }

    const gqr = (event) => {
        event.preventDefault();
        if (url === "") {
            alert("You did not enter a URL");
            rUrl.current.focus();
            setQrcode("");
            return;
        }

        let res = "https://api.qrserver.com/v1/create-qr-code/?data=" + url;
        setQrcode(res);
    }

    const dqr = (event) => {
        event.preventDefault();       
        if (qrcode === "") {
            alert("No QR Code found");
            return;
        }
        saveAs(qrcode, "qrcode.png");
    }

    return (
        <div className="qr-container">
            <h1><span>QR</span><span className="verse">Verse</span></h1>
            <form onSubmit={gqr}>
                <input type="text" placeholder="Enter URL" onChange={hUrl} value={url} ref={rUrl} />
                <input type="submit" value="Generate QR Code" />
            </form>
            {qrcode && <img src={qrcode} alt="Generated QR Code" />}
            {qrcode && (
                <form onSubmit={dqr}>
                    <input type="submit" value="Download QR Code" />
                </form>
            )}
        </div>
    );
}