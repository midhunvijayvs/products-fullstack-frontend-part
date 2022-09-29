import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, pdf, BlobProvider, Font, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { Button } from 'antd';

import { get, post, put } from './axiosConfig';
import axios from "axios";






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

    },
    headerTitle: {
        color: '#fff',
    },
    compName: {
        color: 'rgb(236, 178, 90)',
    },

    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },

    imageWrap:{
        borderRadius:'5pt',
        border:'1pt'
      },
    image:{
        height:'150pt',
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





const GeneratePdfPage = (props) => {

   

    useEffect(
        () => {
            console.log('props:', props);


            



           
        }
        , [])


        var href='';


        const buttonClicked=()=>{
//             axios({
//                 url: `${BASE_URL}/getFile/${props.data.id}`, //your url
//                 method: 'GET',
//                 responseType: 'blob', // important
//             }).then((response) => {
//                 // create file link in browser's memory
//                 href = URL.createObjectURL(response.data);
                
//                 console.log('href:',href);
//                console.log('response:',response);

//                var urlCreator = window.URL || window.webkitURL;
//    var imageUrl = urlCreator.createObjectURL(response.data);
//    console.log('imageURL:',imageUrl);

            
               
            // });
        
        };


    const MyPDFDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Product Catelogue</Text>
                    <Text style={styles.compName}>Tranetech</Text>

                </View>
                <View style={styles.section}>

                    <View style={styles.imageWrap}>
                        <Image style={styles.image} src={props.data.image_public_url} alt='Product Image'/>
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

    return (
        <>

            {/* <PDFViewer>
                <MyPDFDocument />
            </PDFViewer> */}



            <div>
                <BlobProvider document={MyPDFDocument}>
                    {({ blob, url, loading, error }) => {

                        // Do whatever you need with blob here
                        return <Button className='button-yellow' onClick={function () {
                            // buttonClicked();
                             window.open(`${url}`);
                        }}>Print PDF</Button>
                    }}
                </BlobProvider>
            </div>

        </>
    );
}




export default GeneratePdfPage;