import React, { useState, useContext, useRef, useEffect } from "react"
import axios from "axios"
import { Button, Card, Col, Form, Alert } from "react-bootstrap"

export default function Feedback(props) {
  const { csrf_token } = props

  const [currentStep, setCurrentStep] = useState(1)
  const [error_messages, setErrorMessages] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const [errorShow, setErrorShow] = useState(false);
  const [infoValid, setInfoValid] = useState(false);
  const [messageValid , setMessageValid ] = useState(false);

  // Go to next form
  const nextClick = () => {
    if (infoValid)
      setCurrentStep(2)
  }

  // POST new feedback
  const handleSubmit = e => {
    e.preventDefault()
    setMessage("")

    var formData = new FormData()
    formData.append('info[first_name]', firstName)
    formData.append('info[last_name]', lastName)
    formData.append('info[email]', email)
    formData.append('info[messages_attributes][0][content]', message)

    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token

    axios.post("/feedback", formData)
      .then((response) =>  {
        console.log(response)

        if (response.data.success) {
          setCurrentStep(3)
        }

        if (response.data.errors) {
          setCurrentStep(1)


          setErrorMessages(response.data.errors)
          setErrorShow(true)
        }
      })
      .catch((error) => {
        console.log(error)
        setErrorMessages(["Something went wrong"])
        setErrorShow(true)

      });
  }

  // Update info validation status
  useEffect(() => { if (firstName.trim() !== "" && lastName.trim()
    !== "" && email.trim() !== "" && email.match(/^(.+)@(.+)$/))
    setInfoValid(true)
  else
    setInfoValid(false)
  }, [firstName, lastName, email]);

  // Update message validation status
  useEffect(() => { if (message.trim() !== "")
    setMessageValid(true)
  else
    setMessageValid(false)
  }, [message]);

  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{background: "#edf1f7"}}>
      <div className="vw-100 bg-primary position-absolute" style={{top: "0", height: "55vh"}}></div>
      <Col lg="4" md="6" sm="12">
        <Card className="rounded-0 border-0 shadow">
          <Card.Header className="border-bottom-0" style={{background: "#edf1f7"}}>
            <h3 className="card-title text-primary text-center p-3">
              {currentStep < 3 ? "Send us your feedback!" : "THANKS!"
              }
            </h3>
          </Card.Header>

          <Card.Body>
            {errorShow &&
              <Alert variant="danger" onClose={() => setErrorShow(false)} dismissible>
                {error_messages.map(message => <div>{message}</div>)}
              </Alert>
            }

            {currentStep < 3 &&
              <Form onSubmit={handleSubmit}>
                {currentStep === 1 &&
                  <React.Fragment>
                    <Form.Group>
                      <Form.Label>First name *</Form.Label>
                      <Form.Control type="text" value={firstName} autoFocus
                        onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Last name *</Form.Label>
                      <Form.Control type="text" value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email address *</Form.Label>
                      <Form.Control type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="button" className="btn-block" disabled={!infoValid}
                      onClick={() => nextClick()}>
                      Next
                    </Button>
                  </React.Fragment>
                }

                {currentStep === 2 &&
                  <React.Fragment>
                  <Form.Group>
                    <Form.Label>Message *</Form.Label>
                    <Form.Control as="textarea" rows="6" value={message} autoFocus
                      onChange={(e) => setMessage(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="btn-block" disabled={!messageValid}>
                    Submit
                  </Button>
                  </React.Fragment>
                }
              </Form>
            }

            {currentStep === 3 &&
              <div className="text-center">
                <p>Thank you for your feedback!</p>
                <p>Our team will get back to you soon.</p>
              </div>
            }
          </Card.Body>
        </Card>
      </Col>
    </div>
  )
}
