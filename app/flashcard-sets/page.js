"use client"

import { useUser } from "@clerk/nextjs";
import { database } from "../../firebase";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";

export default function FlashcardSets() {
    const { isLoaded, isSignedIn, user } = useUser()

    const router = useRouter()

    const [flashcardSets, setFlashcardSets] = useState([])

    useEffect(() => {
        async function getFlashcardSets(){
            if(!user) return
            const docRef = doc(collection(database, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const collections = docSnap.data().flashcardSets || []
                // console.log(collections)
                setFlashcardSets(collections)
            } else {
                await setDoc(docRef, {flashcardSets: []})
            }
        }

        getFlashcardSets()
    }, [user])

    // if (!isLoaded || !isSignedIn) {
    //     return(<></>)
    // }

    const handleCardClick = (name) => {
        router.push(`/flashcard-set?name=${name}`)
    }

    // flashcardSets.forEach(fcSet => {
    //     console.log(fcSet.name)
    //     fcSet.flashcards.forEach(flashcard => {
    //         console.log(flashcard.front)
    //     })
    // })

    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{mt: 4}}>
                {flashcardSets.map((flashcardSet, index) => {
                    return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={()=>handleCardClick(flashcardSet.name)}>
                            <CardContent>
                                <Typography variant="h6">{flashcardSet.name}</Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )})}
            </Grid>
        </Container>
    )

}