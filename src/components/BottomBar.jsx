import { Fab, Modal } from '@mui/material';
import { useState } from 'react';

import { addEntry, getEntries } from '../../services/firebase';

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

const BottomBar = ({ data, setFeed }) => {
    //states
    const [isModalOpen, setModalOpen] = useState(false);
    const [filterModal, setFilterModal] = useState(false);

    const initalEntry = {
        "type": "",
        "rupee": "",
        "comment": "",
    }
    const [entry, setEntry] = useState(initalEntry)

    const onChangeEvent = (e) => {
        setEntry({
            ...entry,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log("Entry", entry)
        //entry.date - '2023-06-21'
        const extractMonthDay = new Date(entry.date).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', weekday: "short", month: 'short' });
        const dateValueSplit = entry.date.split("-").reverse();    //[08,06,2023]
        console.log("extractMonthDay", extractMonthDay)  //Jun Thu
        const extractMonthDaySplit = extractMonthDay.split(" ");   //["Jun", "Thu"]
        const formattedDate = dateValueSplit[0] + " " + extractMonthDaySplit[0] + " " + dateValueSplit[2] + ", " + extractMonthDaySplit[1];

        console.log("formatedDateAndDay", formattedDate);

        const updatedEntry = { ...entry, formattedDate };
        console.log("Final", updatedEntry)

        addEntry(updatedEntry)
            .then(() => { console.log("Successfully added"); })
            .catch((err) => {
                console.log("Error", err);
            }).finally(() => {
                setEntry(initalEntry)
                setModalOpen(false)
            })

        getEntries().then((res) => {
            setFeed(res);
        })
    }

    const filterFeed = (type) => {
        console.log("TTTTTType", type)
        const filteredData = data.filter((entry) => type == entry.type)
        console.log("FilteredData", filteredData)
        setFilterModal(false)
        setFeed(filteredData);
    }

    return <>
        <Modal open={filterModal} onClose={() => {
            setFilterModal(false)
        }}>
            <div style={{ position: "absolute", top: "50%", left: "45%", backgroundColor: "white", padding: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <b>Filter</b>
                    <button onClick={() => setFilterModal(false)}>X</button>
                </div>
                <br/>

                <button onClick={() => { filterFeed("Investment") }}>Investments</button><br/>
                <button onClick={() => { filterFeed("Spending") }}>Spendings</button><br/>
                <button onClick={() => { filterFeed("Income") }}>Income</button><br /><br/>
                <button onClick={()=>{
                    getEntries().then((res)=>{
                        setFeed(res);
                        setFilterModal(false)
                    })
                }}>Clear Filter</button>
    </div>
    </Modal >
        <Modal open={isModalOpen} onClose={() => {
            setModalOpen(false)
            setEntry(initalEntry)
        }}>
            <div style={{ position: "absolute", top: "50%", left: "45%", backgroundColor: "white", padding: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    Add Item
                    <button onClick={() => setModalOpen(false)}>X</button>
                </div>

                <form onSubmit={onFormSubmit}>

                    <select name="type" onChange={onChangeEvent} value={entry.type} required>
                        <option value="Select Type">Select type</option>
                        <option type="tel" value="Income" >Income</option>
                        <option value="Spending" >Spending</option>
                        <option value="Investment">Investment</option>
                    </select>
                    <br />
                    <br />

                    <input type="tel" placeholder='Rupee' name="rupee" onChange={onChangeEvent} /><br /><br />
                    <input id="dat" name="date" type="date" onChange={onChangeEvent} /><br /><br />
                    <textarea placeholder='Comment' name='comment' onChange={onChangeEvent} /><br /><br />
                    <button type="submit">Add</button><br />
                </form>


            </div>
        </Modal>
        <Fab onClick={()=>{console.log("CLickedMo"); setFilterModal(true)}} style={{ position: "absolute", bottom: "0", left: "0", margin: "5px" }}>
            <FilterListIcon />
        </Fab>
        <Fab onClick={() => { console.log("Clicked"); setModalOpen(true) }} style={{ position: "absolute", bottom: "0", right: "0", margin: "5px" }}>
            <AddIcon/>
        </Fab>
    </>
}

export default BottomBar;


