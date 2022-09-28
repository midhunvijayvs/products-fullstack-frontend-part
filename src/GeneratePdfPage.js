import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

import { Button, Image } from 'antd';

// Create styles for PDF Document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginRight: '50pt'
    },
    header: {
        backgroundColor: '#6b6d70',
        
        alignItems: 'center',
        justifyContent: 'space-between',
        fonSize: '10pt',
        color: 'white',
        padding: '10pt',
        paddingTop: '30pt'
    },
    headerTitle: {
        color:'#fff',
    },

    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: '40pt',
        marginBottom: '10pt'
    },
    shortNote: {
        marginBottom: '20pt',
        fontStyle:'italic',
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
    descriptionHead: {
        marginBottom: '10pt'
    },
    description: {
        fontSize: '12px',
        fontWeight: 'Normal',
        width: '360pt',
        color: '#707070',
    },
    vat: {

    },

});

// Create Document Component for PDF file




// const GeneratePdfPage = () => {
//     const blob = pdf(MyPDFDocument).toBlob();
//     return (
//         <div>
//             <PDFDownloadLink document={<MyPDFDocument />} fileName="somename.pdf">
//                 {({ blob, url, loading, error }) =>
//                     loading ? 'Loading document...' : 'Download now!'
//                 }
//             </PDFDownloadLink>
//         </div>
//     )

// }

const GeneratePdfPage = (props) => {

    useEffect(
        () => { console.log('props:', props); }
        , [])



    const MyPDFDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                <Text style={styles.headerTitle}>Product Catelogue</Text>
                </View>
                <View style={styles.section}>


                    <Image src={props.data.image_public_url}></Image>

                    <View>
                        <Text style={styles.title}>{props.data.title}</Text>
                        <Text style={styles.shortNote}>{props.data.short_note}</Text>
                        <View style={styles.priceWrap}>
                            <Text style={styles.price}>Price  </Text>
                            <Text>Rs: {props.data.price} + {props.data.vat_percentage}% VAT</Text>
                        </View>
                        <Text style={styles.descriptionHead}>Product Description:</Text>
                        <Text style={styles.description}>{props.data.description}</Text>

                    </View>

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
                            window.open(`${url}`);
                        }} href={url} target="_blank">Print PDF</Button>
                    }}
                </BlobProvider>
            </div>

        </>
    );
}




export default GeneratePdfPage;