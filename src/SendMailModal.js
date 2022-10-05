import React, { useEffect, useState } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout, Input } from 'antd';
import { CloseOutlined,FilePdfOutlined } from '@ant-design/icons';
import { Space, Form, Checkbox } from 'antd';
import { get, post, put } from './axiosConfig';
import { Document, Page, Text, View, StyleSheet, Image, Font, BlobProvider } from '@react-pdf/renderer';
import TextArea from 'antd/lib/input/TextArea';


function SendMailModal(props) {

  const [pDFBlob, setPDFBlob] = useState(null);

  useEffect(() => {
    console.log('pDFBlob:', pDFBlob);
  }, [pDFBlob]);


  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

  // Create styles for PDF Document

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      marginRight: '50pt'
    },
    header: {
      flexDirection: 'row',
      backgroundColor: '#6b6d70',
      marginTop: '5pt',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '12pt',
      color: 'white',
      padding: '10pt',
      borderBottom: '10px solid rgb(236, 178, 90)',

    },
    headerTitle: {
      fontSize: '20pt',
      color: '#fff',
    },
    compName: {
      color: 'rgb(236, 178, 90)',
      fontFamily: 'Oswald',
      fontSize: '18pt',
      fontWeight: '900',
    },

    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    letterHeadWrap: {
      marginBottom: '20pt',
      fontSize: '12pt',
      color: '#fff',
      lineHeight: '1.5',
    },



    imageWrap: {
      borderRadius: '5pt',
      border: '1pt'
    },
    image: {
      height: '150pt',
    },

    title: {
      fontSize: '40pt',
      marginBottom: '10pt',
      fontFamily: 'Oswald'
    },
    shortNote: {
      marginBottom: '20pt',
      fontStyle: 'italic',
      color: '#707070',

    },
    priceWrap: {
      flexDirection: 'row',
      marginBottom: '20pt'

    },
    price: {
      color: 'rgb(236, 178, 90)',
      fontWeight: '600',
    },
    priceDecimal: {

    },
    descriptionHead: {
      marginBottom: '10pt'
    },
    description: {
      fontSize: '12pt',
      fontWeight: 'Normal',
      width: '360pt',
      color: '#707070',
      fontFamily: 'Times-Roman'
    },
    vat: {
      fontSize: '12pt',

      color: '#707070',
    },
    footer: {
      flexDirection: 'row',
      backgroundColor: '#6b6d70',
      marginBottom: '5pt',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '7pt',
      color: 'white',
      padding: '5pt',

    },
    footerText1: {
      fontSize: '10pt',
      fontFamily: 'Oswald',
      color: '#fff',
    },
    footerText2: {
      fontSize: '7pt',
      color: '#fff',
    },


  });


  const MyPDFDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Product Catelogue</Text>

          <View style={styles.letterHeadWrap}>
            {/* <Image src='./images/tranetech.png'></Image> */}
            <Text style={styles.compName}>Tranetech</Text>

            <Text style={styles.lhAddress}>Address Line 1</Text>
            <Text style={styles.lhAddress}>Address Line 2</Text>
            <Text style={styles.lhAddress}>Address Line 3</Text>


          </View>

        </View>

        <View style={styles.section}>




          <View style={styles.imageWrap}>

            <Image style={styles.image} src={props.data.image_public_url} alt='Product Image' />
          </View>

          <View>
            <Text style={styles.title}>{props.data.title}</Text>
            <Text style={styles.shortNote}>{props.data.short_note}</Text>
            <View style={styles.priceWrap}>
              <Text style={styles.price}>Price</Text>
              <Text style={styles.priceDecimal}>Rs: {props.data.price}</Text>
              <Text style={styles.vat}> + {props.data.vat_percentage}% VAT</Text>
            </View>
            <Text style={styles.descriptionHead}>Product Description:</Text>
            <Text style={styles.description}>{props.data.description}</Text>

          </View>

        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText1}>someone@tranetech.com</Text>
          <Text style={styles.footerText2}>Copyright c Tranetech</Text>
          <Text style={styles.footerText1}>Page 1</Text>

        </View>
      </Page>
    </Document>
  );

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const cancelClicked = () => {
    props.setSendMailModalShown(false)

  }



  const sendMail = (values) => {

    let formdata1 = new FormData;
    formdata1.append('to', values.to);
    formdata1.append('cc', values.cc);
    formdata1.append('bcc', values.bcc);
    formdata1.append('from', values.from);
    formdata1.append('subject', values.subject);
    formdata1.append('content', values.content);



    formdata1.append('attachment', pDFBlob);



    formdata1.append('title', props.data.title);
    formdata1.append('price', props.data.price);
    formdata1.append('description', props.data.description);



    props.setSendMailModalShown(false);

    post('/sendMail', formdata1)
      .then(function (response) {

        console.log('Response for Add', response);

      })
      .catch(function (error) {
        console.log(error);
      });

  }





  return (

    <div className='modal-frame'>


      <Layout>

        <Header>
          <h5>Send Email</h5>
          <Button onClick={() => props.setSendMailModalShown(false)} className="close-button"><CloseOutlined /></Button>
        </Header>

        <Content className='modal-content'>

          <Form name='AddProductForm' onFinish={sendMail} onFinishFailed={onFinishFailed} autoComplete="off"
            initialValues={{
              ["to"]: 'midhunvijayvs@gmail.com',
              ["cc"]: 'ramees.c@tranetech.ae',
              ["bcc"]: 'sufwan@tranetech.ae',
              ["from"]: 'midhun@tranetech.com',
              ["subject"]: 'Testing Mail Server',
              ["content"]: 'lorem ipsum dolor sit amet',

            }}>


            <Form.Item
              label="TO"
              name="to"
              rules={[
                {
                  required: true,
                  message: 'Enter to Mail ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              label="CC"
              name="cc"
              rules={[
                {
                  required: true,
                  message: 'Enter CC Mail ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>



            <Form.Item
              label="BCC"
              name="bcc"
              rules={[
                {
                  required: true,
                  message: 'Enter BCC  Mail ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="FROM"
              name="from"
              rules={[
                {
                  required: true,
                  message: 'Enter from Mail ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>



            <Form.Item
              label="SUBJECT"
              name="subject"
              rules={[
                {
                  required: true,
                  message: 'Enter Subject!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label=" CONTENT"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Enter Mail Content!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>



            <Form.Item
            label='ATTACHMENT'>
            <BlobProvider document={MyPDFDocument}>
              {({ blob, url, loading, error }) => {
                // Do whatever you need with blob here
                return <div className='link'><FilePdfOutlined style={{ fontSize: '200%'}} />&nbsp; {loading ? 'Generating PDF document...' : 'product_catelogue.pdf'}
                  {setPDFBlob(blob)}</div>;

              }}
            </BlobProvider>
            </Form.Item>
              
           

            



            <Space>
              <Form.Item>
                <Button className='button-yellow' type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>

              <Form.Item>
                <Button className='cancel-button' onClick={cancelClicked}>Cancel</Button>
              </Form.Item>


            </Space>

          </Form>




        </Content>




      </Layout>

    </div>
  );
}

export default SendMailModal;