import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveHerb } from '../utils/herbUtils';
import { getSavedHerbs, saveHerbs } from '../utils/localStorage';
import type { Herb } from '../models/Herb';
import { searchChatGPTForHerbs } from '../utils/chatGPTUtils'; // New utility function

const SearchHerbs = () => {
    // create state for holding returned ChatGPT data
    const [searchedHerbs, setSearchedHerbs] = useState<Herb[]>([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    // create state to hold saved herb values
    const [savedHerbs, setSavedHerbs] = useState(getSavedHerbs());

    // useEffect hook to save `savedHerbs` list to localStorage on component unmount
    useEffect(() => {
        return () => saveHerbs(savedHerbs);
    }, [savedHerbs]);

    // search for herbs and set state on form submit
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const herbData = await searchChatGPTForHerbs(searchInput); // Fetch data from ChatGPT

            setSearchedHerbs(herbData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // function to save a herb to our database
    const handleSaveHerb = async (herbName: string) => {
        const herbToSave = searchedHerbs.find((herb) => herb.herb_name === herbName)!;

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveHerb(herbToSave, token);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            // if herb successfully saved to user's account, save herb name to state
            setSavedHerbs([...savedHerbs, herbToSave.herb_name]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="text-light bg-dark p-5">
                <Container>
                    <h1>Search for Herbs!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                                    value={searchInput}
                                    type="text"
                                    size="lg"
                                    placeholder="Search for a herb"
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type="submit" variant="success" size="lg">
                                    Submit Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>

            <Container>
                <h2 className="pt-5">
                    {searchedHerbs.length
                        ? `Viewing ${searchedHerbs.length} results:`
                        : 'Search for a herb to begin'}
                </h2>
                <Row>
                    {searchedHerbs.map((herb) => (
                        <Col md="4" key={herb.herb_name}>
                            <Card border="dark">
                                {herb.image ? (
                                    <Card.Img src={herb.image} alt={`The picture of ${herb.herb_name}`} variant="top" />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{herb.herb_name}</Card.Title>
                                    <Card.Text>{herb.description}</Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button
                                            disabled={savedHerbs?.some((savedHerb: string) => savedHerb === herb.herb_name)}
                                            onClick={() => handleSaveHerb(herb.herb_name)}
                                        >
                                            {savedHerbs?.some((savedHerb: string) => savedHerb === herb.herb_name)
                                                ? 'This herb has already been saved!'
                                                : 'Save this Herb!'}
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default SearchHerbs;
