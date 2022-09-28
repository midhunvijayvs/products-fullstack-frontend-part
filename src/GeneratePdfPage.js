import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

import { Button, Image } from 'antd';

// Create styles for PDF Document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: '50px'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: '40px',
    },
    shortNote: {

    },
    price: {

    },
    descriptionHead: {

    },
    description: {
        fontSize: '12px',
        width: '500px'
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
                <View style={styles.section}>

                    <div className="primary-frame product-card-frame">
                        <Image src={props.data.image_public_url} />
                        <div className='image-wrap'>
                            <Image alt='Product' src={`${props.data.image_public_url}?${props.data.updated_at}`}></Image>
                        </div>

                        <div className='text-wrap'>
                            <Text style={styles.title}>{props.data.title}</Text>
                            <Text style={styles.shortNote}>{props.data.short_note}</Text>
                            <div>
                                <Text style={styles.price}>Price</Text>
                                <Text>Rs: {props.data.price} + {props.data.vat_percentage}% </Text>
                                <Text style={styles.vat}>VAT</Text>
                            </div>
                            <Text style={styles.descriptionHead}>Product Description:</Text>
                            <Text style={styles.description}>{props.data.description}</Text>
                        </div>


                    </div>

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