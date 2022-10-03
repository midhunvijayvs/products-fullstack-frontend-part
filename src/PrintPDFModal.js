import React, { useEffect, useState } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Space, Form, Checkbox } from 'antd';
import { Document, Page, Text, View, StyleSheet, Image, pdf, BlobProvider, Font, PDFDownloadLink } from '@react-pdf/renderer';



function PrintPDFModal(props) {


  const [letterHeadShown, setLetterHeadShown] = useState(null);





  useEffect(
    () => {
      console.log('letterHeadShown:', letterHeadShown);


    }
    , [letterHeadShown]);


 

  const cancelClicked = () => {
    props.setPrintPDFModalShown(false)

  }




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
      borderBottom:'10px solid rgb(236, 178, 90)',

    },
    headerTitle: {
      fontSize: '20pt',
      color: '#fff',
    },
    compName: {
      color: 'rgb(236, 178, 90)',
      fontFamily: 'Oswald',
      fontSize:'18pt',
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
      color:'#fff',
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
        {letterHeadShown ? <View style={styles.header}>
          <Text style={styles.headerTitle}>Product Catelogue</Text>

          <View style={styles.letterHeadWrap}>
            {/* <Image src='./images/tranetech.png'></Image> */}
            <Text style={styles.compName}>Tranetech</Text>

            <Text style={styles.lhAddress}>Address Line 1</Text>
            <Text style={styles.lhAddress}>Address Line 2</Text>
            <Text style={styles.lhAddress}>Address Line 3</Text>


          </View>

        </View> : null}

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

  const checkBoxClicked = (e) => {
    setLetterHeadShown(e.target.checked);
  };
  return (


    <div className='modal-frame'>
      <Layout>

        <Header>
          <h5>Print PDF</h5>
          <Button onClick={() => props.setPrintPDFModalShown(false)} className="close-button"><CloseOutlined /></Button>
        </Header>

        <Content className='modal-content'>

          <Checkbox className='letter-head-checkbox' onChange={checkBoxClicked}>AddLetterHead</Checkbox>

          <Space>

            <BlobProvider document={MyPDFDocument}>
              {({ blob, url, loading, error }) => {
                return (<Button className='button-yellow' onClick={function () {
                  window.open(`${url}`);
                  props.setPrintPDFModalShown(false)
                }}>Print</Button>)


              }}
            </BlobProvider>

            <Button className='cancel-button' onClick={cancelClicked}>Cancel</Button>

          </Space>


        </Content>




      </Layout>

    </div>
  );
}

export default PrintPDFModal;