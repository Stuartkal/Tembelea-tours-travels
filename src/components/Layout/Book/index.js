import React, { useState, useRef } from 'react';
import {useLocation} from 'react-router-dom'
import emailjs from '@emailjs/browser'
import apiKeys from './emailkey'
import Slider from './slider';
import { Tabs, DatePicker, Space } from 'antd';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import './Styles.css';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const  Book = () => {

  const [State, setState] = useState({
    startDate: '',
    endDate:'',
    name:'',
    contact:'',
    travellers: '',
    name2: '',
    email: '',
    phone: '',
    note: ''
  })
  const [loading, setLoading] = useState(false)

  const { state } = useLocation()
  const form = useRef()

  console.log(State)

  const sendEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs.sendForm(apiKeys.SERVICE_ID, apiKeys.TEMPLATE_ID, form.current, apiKeys.USER_ID)
      .then((result) => {
        alert("Message Sent, We will get back to you shortly", result.text)
        setLoading(false)
      },
        (error) => {
          alert("An error occurred, Please try again", error.text)
        })
  }

  const onChange = (value, dateString) => {
    setState({
      startDate: dateString[0],
      endDate: dateString[1]
    })
  }
  

  return (
    <div className='booking-conatiner'>
      <div className='book-main'>
        <div className='book-left-column'>
        <h1>{state.trip}</h1>
        <div className='header-text-row'>
          <h5>{state.location}</h5>
          <LocationOnIcon style={{ fontSize: '18px', color: 'rgba(0, 0, 0, 0.2)', marginBottom:'8' }} />
        </div>
          <Slider/>
          <hr/>
          <div className='description'>
            <h2>Description</h2>
            <h5>Well-placed in the shopping, sightseeing area of New York (NY) city, Dylan Hotel provides a most conducive spot for you to take a break from your busy days. 
              The hotel is not too far from the city center: just 2 km away, and it normally takes about 26 minutes to reach the airport. 
              Also within easy reach are New Zealand Consulate General, Park Avenue Christian Church, Discovery Channel Store.

              Dylan Hotel also offers many facilities to enrich your stay in New York (NY). Free Wi-Fi in all rooms, facilities for disabled guests, Wi-Fi in public areas, 
              room service, airport transfer are just a few of the facilities that set Dylan Hotel apart from other hotels in the city.

              All guest accommodations feature thoughtful amenities to ensure an unparalleled sense of comfort. 
              Besides, the hotel’s host of recreational offerings ensures you have plenty to do during your stay. 
              Discover an engaging blend of professional service and a wide array of features at Dylan Hotel.</h5>
          </div>
          </div>
          <div className='book-right-column'>
            <div className='amount'>
              <h2>Shs {state.charge} UGX</h2>
            </div>
        <Tabs 
          defaultActiveKey="1" 
          centered
          tabBarStyle={{ color: 'green' }}
          >
          <TabPane tab="BOOK" key="1" className='tab-pane'>
            <form ref={form} onSubmit={sendEmail}>
            <h3>CheckIn & CheckOut</h3>
              <div className='tab-pane-row-label'>
              <p>Start Date</p>
              <p>End Date</p>
            </div>
            <div className='tab-pane-row'>
              <input
                type='date'
                name='start'
              />
                <input
                  type='date'
                  name='end'
                />
            </div>
            {/* <Space style={{marginBottom:'0.5rem'}} direction="vertical" size={12}>
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                name='date1'
              />
            </Space> */}
            <Accordion style={{width:'100%', marginBottom:'1rem'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>Booking Details</h3>
              </AccordionSummary>
              <AccordionDetails>
                <div className='guest-form'>
                  <div className='guest-form-column'>
                    <h4>Your Name</h4>
                    <h4>Contact</h4>
                    <h4>Trip</h4>
                    <h4>No. of People</h4>  
                  </div>
                  <div className='guest-form-column'>
                    <input
                      type='text'
                      name='name'
                      onChange={(e) => setState({ ...State, name: e.target.value })}
                        />
                    <input
                      type='tel'
                      name='phone'
                      onChange={(e) => setState({ ...State, contact: e.target.value })}
                        />
                      <input
                        type='tel'
                        name='trip'
                      />
                    <input
                      type='number'
                      min='0'
                      name='number'
                      onChange={(e) => setState({ ...State, travellers: e.target.value })}
                    />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
                <button type='submit'>{loading ? 'Booking': 'Book'}</button>
              </form>
          </TabPane>
          <TabPane tab="INQUIRY" key="2" className='tab-pane'>
            <input
              placeholder='Name'
              type='text'
              onChange={(e) => setState({ ...State, name2: e.target.value })}
            />
            <input
              placeholder='Email'
              type='email'
              onChange={(e) => setState({ ...State, email: e.target.value })}
            />
            <input
              placeholder='Phone'
              type='tel'
              onChange={(e) => setState({ ...State, phone: e.target.value })}
            />
            <textarea 
              placeholder='Note'
              type='text'
              onChange={(e) => setState({ ...State, note: e.target.value })}
            />
            <button>send</button>
          </TabPane>
        </Tabs>
          </div>
      </div>
    </div>
  )
}

export default Book
