import Paper from '@mui/material/Paper';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteEntry, getEntries } from '../../services/firebase';
import IconButton from '@mui/material/IconButton';

const isDateEqual = (prevDate, currDate) => {
    console.log("Inside: isDateEqual")
    if (prevDate == null) return true;
    const curr = currDate.split(",")[0]
    const prev = prevDate.split(",")[0]
    console.log("p", prev);
    console.log("c", curr);
    if (curr != prev)
        return true;
    return false;

}

const Feed = ({ data, setFeed }) => {

    let previousDate = null;
    data.sort(function (a, b) {
        const formatA = a.formattedDate.split(",")[0]
        const formatB = b.formattedDate.split(",")[0]
        return new Date(formatB) - new Date(formatA);
    });
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
        <div>
            {
                data.map((e, i) => {
                    let icon;
                    let cardColor;

                    if (i > 0) previousDate = data[i - 1].formattedDate;
                    if (e.type === "Income") {
                        cardColor = "#27ae60"
                        icon = <CurrencyRupeeIcon />
                    } else if (e.type === "Spending") {
                        cardColor = "#e74c3c";
                        icon = <RemoveCircleIcon />
                    } else {
                        cardColor = "#F79F1F";
                        icon = <SavingsRoundedIcon />
                    }
                    console.log("Color", cardColor)
                    return <div key={i}>

                        {(isDateEqual(previousDate, e.formattedDate)) ? <><hr style={{ width: "15%" }} />< p style={{ textAlign: "center", fontFamily: "sans-serif", margin: "0px" }}>{e.formattedDate}</p></> : ""}
                        <Paper key={i} onClick={() => { console.log(e.id) }} variant="outlined" style={{ display: "flex", width:"50vh", backgroundColor: `${cardColor}`, borderRadius: "10px", marginTop: "5px", marginBottom: "15px", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ padding: "5px 15px 0px 15px", color: "white" }}>
                                    {icon}
                                </div>
                                <div style={{ textAlign: "center", color: "white" }}>
                                    <b>{e.rupee}</b>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "white", wordWrap:"break-word"}}>
                                {e.comment}
                            </div>
                            <IconButton style={{ backgroundColor: "white", margin: "7px" }} onClick={() => {
                                deleteEntry(e.id)
                                    .then(() => {
                                        console.log("Deleted")
                                        getEntries().then(res => {
                                            setFeed(res)
                                        })
                                            .catch(err => {
                                                console.log("err", err);
                                            })
                                    }).catch(() => {
                                        console.log("not deleted")
                                    })
                            }} size="large">
                                <DeleteIcon style={{ color: "#e74c3c" }} />
                            </IconButton>

                        </Paper>
                    </div>
                })
            }


        </div>
    </div>

}

export default Feed;