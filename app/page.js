"use client";

import { Box, Button, Modal, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  gap: 2,
  display: "flex",
  flexDirection: "column",
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [itemName, setItemName] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const gd = await getDocs(snapshot);
    const pantryList = [];
    gd.forEach((i) => {
      pantryList.push({ name: i.id, ...i.data() });
    });
    console.log(pantryList);
    setPantry(pantryList);
  };
  useEffect(() => {
    updatePantry();
  }, []);
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const count1 = docSnap.data();
      const c = count1.count;
      await setDoc(docRef, { count: c + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
    setItemName("");
    handleClose();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const count1 = docSnap.data();
      const c = count1.count;
      if (c === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: c - 1 });
      }
    }
    await updatePantry();
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add item
          </Typography>
          <Stack width="100%" height="300px" spacing={2}>
            <TextField
              id="outlined-basic"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              label="item"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" onClick={() => addItem(itemName)}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>
      <Box border={"1px solid black"}>
        <Box
          width="800px"
          height="100px"
          backgroundColor="LightBlue"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" color="#333" textAlign={"center"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
          {pantry.map(({ name, count }) => (
            <Stack
              key={name}
              direction={"row"}
              spacing={2}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box
                key={name}
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#f0f0f0"
              >
                <Typography variant="h2" color="#333" textAlign={"center"}>
                  {name}
                </Typography>
                <Typography variant="p" color="#333" textAlign={"center"}>
                  quantity: {count}
                </Typography>
              </Box>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
