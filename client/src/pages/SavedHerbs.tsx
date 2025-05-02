import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { getMe, deleteHerb } from '../utils/API';
import Auth from '../utils/auth';
import { removeHerbs } from '../utils/localStorage';
import type { User } from '../models/User';

const SavedHerbs = () => {
  const [userData, setUserData] = useState<User>({
    email: '',
    password: '',
  });

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the herb mongo _id value as param and deletes the herb from the database
  const handleDeleteHerb = async (herb: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteHerb(herb, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove herb from localStorage
      removeHerbs(herb);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing your saved herbs!</h1>
          ) : (
            <h1>Viewing saved herbs!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedHerbs.length
            ? `Viewing ${userData.savedHerbs.length} saved ${
                userData.savedHerbs.length === 1 ? 'herb' : 'herbs'
              }:`
            : 'You have no saved herbs!'}
        </h2>
        <Row>
          {userData.savedHerbs.map((herb: { herbs: string; image?: string; title: string; description: string }) => {
            return (
              <Col md='4'>
                <Card key={herb.herbs} border='dark'>
                  {herb.image ? (
                    <Card.Img
                      src={herb.image}
                      alt={`The picture of ${herb}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{herb.title}</Card.Title>
                    <p className='small'>Herb Name: {herb.herbs}</p>
                    <Card.Text>{herb.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteHerb(herb.herbs)}
                    >
                      Delete this Herb!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedHerbs;
