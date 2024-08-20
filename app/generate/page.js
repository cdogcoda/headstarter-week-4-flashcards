'use client'

import { useState } from "react"
import { Container, TextField, Button, Typography, Box, Card, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Grid } from "@mui/material"
import { writeBatch, doc, getDoc, setDoc, collection } from "firebase/firestore"
import { database } from "../../firebase"
import { LoaderCircle } from "lucide-react"
import Header from "@/components/Header"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"

export default function Generate() {
    const userObj = useUser()

    const [text, setText] = useState('')
    const [flashcards, setFlashcards] = useState([])

    const [generating, setGenerating] = useState(false) //set to false first, set to true for testing state

    const [setName, setSetName] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    const saveFlashcards = async () => {
        if (!setName.trim()) {
            alert('Please enter a name for your flashcard set.')
            return
        }
        try {
            const userDocRef = doc(collection(database, 'users'), userObj.user.id)
            const userDocSnap = await getDoc(userDocRef)
            const batch = writeBatch(database)
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data()
                const updatedSets = [...(userData.flashcardSets || []), {name: setName}]
                batch.update(userDocRef, {flashcardSets: updatedSets})
            } else {
                batch.set(userDocRef, {flashcardSets: [{name: setName}]})
            }

            const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
            batch.set(setDocRef, { flashcards })

            await batch.commit()

            alert('Flashcards saved successfully!')
            handleCloseDialog()
            setSetName('')
        } catch (error) {
            console.error('Error saving flashcards:', error)
            alert('An error occurred while saving flashcards. Please try again.')
        }
    }


    const handleSubmit = async () => {
        if (!text.trim()) {
            alert('Please eneter some text to generate flashcards')
            return
        }
        setGenerating(true)
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: text,
            })

        
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to generate flashcards')
            }

            const data = await response.json()
            setFlashcards(data)
        } catch (error) {
            console.error('Error generating flashcards:', error)
            alert('An error occurred while generating flashcards. Please try again.')
        }
        setGenerating(false)
    }

    return (
        <div>
            <Header/>
            <Container
                maxWidth='md'
            >
                <Box
                    sx={{my: 4}}
                >
                    <Typography
                        variant='h4'
                        component='h1'
                        gutterBottom
                    >
                        Generate Flashcards
                    </Typography>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label='Enter text'
                        fullWidth
                        multiline
                        rows={4}
                        variant='outlined'
                        sx={{mb: 2}}
                    />
                    <SignedIn>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit}
                            disabled={generating}
                            fullWidth
                        >
                            {generating ? <span className="animate-spin"><LoaderCircle/></span> : <span>Generate</span>}
                        </Button>
                    </SignedIn>
                    <SignedOut>
                        <Button
                            variant='contained'
                            color='primary'
                            disabled
                            fullWidth
                        >
                            Sign in to generate flashcards
                        </Button>
                    </SignedOut>
                    {flashcards.length > 0 && (
                        <Box
                            sx={{mt: 4}}
                        >
                            <Typography
                                variant='h5'
                                component='h2'
                                gutterBottom
                            >
                                Generated Flashcards
                            </Typography>
                            <Grid
                                container
                                spacing={2}
                            >
                                {flashcards.map((flashcard, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={index}
                                    >
                                        <Card>
                                            <CardContent>
                                                <Typography
                                                    variant='h6'
                                                >
                                                    Front:
                                                </Typography>
                                                <Typography>
                                                    {flashcard.front}
                                                </Typography>
                                                <Typography
                                                    variant='h6'
                                                >
                                                    Back:
                                                </Typography>
                                                <Typography>
                                                    {flashcard.back}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                    <Dialog
                        open={dialogOpen}
                        onClose={handleCloseDialog}
                    >
                        <DialogTitle>
                            Save Flashcard Set
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your flashcard set.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin='dense'
                                label='Set Name'
                                type='text'
                                fullWidth
                                value={setName}
                                onChange={(e) => setSetName(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleCloseDialog}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={saveFlashcards}
                                color='primary'
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {flashcards.length > 0 && (
                        <Box
                            sx={{mt: 4, display: 'flex', justifyContent: 'center'}}
                        >
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleOpenDialog}
                            >
                                Save Flashcards
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </div>
    )
}