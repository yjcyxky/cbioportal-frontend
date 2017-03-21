import * as React from 'react';
import {Td} from 'reactable';
import {IColumnFormatterData} from "shared/components/enhancedReactTable/IColumnFormatter";
import {
    default as DefaultProteinChangeColumnFormatter
} from "shared/components/mutationTable/column/ProteinChangeColumnFormatter";
import MutationStatusColumnFormatter from "shared/components/mutationTable/column/MutationStatusColumnFormatter";
import styles from './style/proteinChange.module.scss';
import {MutationTableRowData} from "shared/components/mutationTable/IMutationTableProps";
import {Mutation} from "../../../../shared/api/generated/CBioPortalAPI";

/**
 * Designed to customize protein change column content for patient view page.
 *
 * @author Selcuk Onur Sumer
 */
export default class ProteinChangeColumnFormatter
{
    public static renderFunction(data:Mutation[])
    {
        // use text as display value
        const text:string = DefaultProteinChangeColumnFormatter.getDisplayValue(data);

        // use value as sort & filter value
        const value:string = DefaultProteinChangeColumnFormatter.getTextValue(data);

        const mutationStatus:string|null = MutationStatusColumnFormatter.getDataFromRow(data);

        let content = <span className={styles.proteinChange}>{text}</span>;

        // add a germline indicator next to protein change if it is a germline mutation!
        if (mutationStatus &&
            mutationStatus.toLowerCase().indexOf("germline") > -1)
        {
            content = (
                <span>
                    {content}
                    <span className={styles.germline}>Germline</span>
                </span>
            );
        }

        return content;
    }
}
