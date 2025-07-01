import type {CvData} from "@/schema.ts";
import {Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Times-Roman',
        fontSize: 12
    },
    header: {
        textAlign: 'center',
        marginBottom: 5
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    jobTitle: {
        fontSize: 14,
        marginBottom: 10,
        fontStyle: 'italic'
    },
    contactInfo: {
        fontSize: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    bulletPoint: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    bullet: {
        fontSize: 11
    },
    contactText: {
        fontSize: 11
    },
    summary: {
        fontSize: 11,
        marginVertical: 15,
        textAlign: 'justify',
        lineHeight: 1.4
    },
    section: {
        marginVertical: 15
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottom: 1,
        paddingBottom: 5
    },
    entry: {
        marginBottom: 10
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    entryTitle: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    place: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },
    entryOrganization: {
        fontSize: 11
    },
    entryLocation: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    entryDate: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    entryDescription: {
        fontSize: 11,
        marginTop: 3,
        textAlign: 'justify'
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    skillItem: {
        fontSize: 11,
        padding: 5,
        borderWidth: 1,
        borderColor: '#333'
    }
});

export function generateCv(data: CvData) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                    <Text style={styles.jobTitle}>{data.personalInfo.jobTitle}</Text>
                    <View style={styles.contactInfo}>
                        <View style={styles.bulletPoint}>
                            <Text style={styles.bullet}>{data.personalInfo.email && (
                                '•'
                            )}</Text>
                            <Text style={styles.contactText}>{data.personalInfo.email}</Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Text style={styles.bullet}>{data.personalInfo.phone && (
                                '•'
                            )}</Text>
                            <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Text style={styles.bullet}>{data.personalInfo.location && (
                                '•'
                            )}</Text>
                            <Text style={styles.contactText}>{data.personalInfo.location}</Text>
                        </View>
                        {data.personalInfo.linkedin && (
                            <View style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.contactText}>{data.personalInfo.linkedin}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Summary Section */}
                {data.personalInfo.summary && (
                    <Text style={styles.summary}>{data.personalInfo.summary}</Text>
                )}

                {/* Experience Section */}
                {data.experiences.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Experience</Text>
                        {data.experiences.map((exp, index) => (
                            <View key={index} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <View>
                                        <Text style={styles.entryTitle}>{exp.title}</Text>
                                        <View style={styles.place}>
                                            <Text style={styles.entryOrganization}>{exp.company}</Text>
                                            <Text style={styles.entryLocation}>{exp.location && (
                                                `, ${exp.location}`
                                            )}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.entryDate}>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </Text>
                                </View>
                                <Text style={styles.entryDescription}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Education Section */}
                {data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu, index) => (
                            <View key={index} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <View>
                                        <Text style={styles.entryTitle}>{edu.degree}</Text>
                                        <View style={styles.place}>
                                            <Text style={styles.entryOrganization}>{edu.institution}</Text>
                                            <Text style={styles.entryLocation}>{edu.location && (
                                                `, ${edu.location}`
                                            )}</Text>
                                        </View>
                                        {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
                                    </View>
                                    <Text style={styles.entryDate}>{edu.graduationYear}</Text>
                                </View>
                                {edu.description && (
                                    <Text style={styles.entryDescription}>{edu.description}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills Section */}
                {data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsContainer}>
                            {data.skills.map((skill, index) => (
                                <Text key={index} style={styles.skillItem}>
                                    {skill.name}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
}