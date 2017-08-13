'use strict';

const Audit = require('lighthouse').Audit;

const STRONG_SLL_GRADES = ['A+', 'A', 'A-'];
const GRADE_PERCENTAGES = { // source https://en.wikipedia.org/wiki/Academic_grading_in_the_United_States#Numerical_and_Letter_grades
    'A+': { min: 100, max: 100 },
    'A' : { min:  93, max:  99 },
    'A-': { min:  90, max:  92 },
    'B+': { min:  87, max:  89 },
    'B' : { min:  83, max:  86 },
    'B-': { min:  80, max:  82 },
    'C+': { min:  77, max:  79 },
    'C' : { min:  73, max:  76 },
    'C-': { min:  70, max:  72 },
    'D+': { min:  67, max:  69 },
    'D' : { min:  63, max:  66 },
    'D-': { min:  60, max:  62 },
    'F' : { min:   0, max:  59 },
}

const getLowestGrade = grades => grades.reduce((lowest, grade) => {
    if (GRADE_PERCENTAGES[grade].min < GRADE_PERCENTAGES[lowest].min) {
        return grade;
    }
    return lowest;
});

class SslGradeAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'ssl-grade',
      description: 'Site has strong SSL configuration',
      failureDescription: 'Site has poor SSL configuration',
      helpText: 'The security level of a site\'s connection with its servers depends on the ' +
          'strength of the SSL configuration, which includes the certificates, protocol support, ' +
          'key exchange and cipher strength. ' +
          'This audit grades servers using the [SSL Test by SSL Labs](https://www.ssllabs.com/ssltest/). ' +
          'For details on the grading method see the [SSL Server Rating Guide](https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide#methodology-overview).',
      requiredArtifacts: ['SslGrade'],
    };
  }

  static audit(artifacts) {
    const report = artifacts.SslGrade;

    if (report.status !== 'READY') {
        return {
            debugString: 'SSL test failed. Try manually on [www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/)',
            rawValue: false,
        }
    }

    const grades = report.endpoints.map(endpoint => endpoint.grade);
    const lowestGrade = getLowestGrade(grades);

    const tableHeadings = [
        { key: 'server', itemType: 'text', text: 'Server' },
        { key: 'grade', itemType: 'text', text: 'Grade' }
    ];
    const tableItems = report.endpoints.map(endpoint => ({
        server: endpoint.serverName ? `${endpoint.ipAddress} (${endpoint.serverName})` : endpoint.ipAddress,
        grade: endpoint.grade
    }));
    const details = Audit.makeTableDetails(tableHeadings, tableItems);

    return {
        displayValue: `Grade ${lowestGrade}`,
        rawValue: STRONG_SLL_GRADES.includes(lowestGrade),
        details
    }
  }
}

module.exports = SslGradeAudit;