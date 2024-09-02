import React from "react";
import { SectionHeader } from "./../../Components/SectionHeader/SectionHeader";
import { useHistory } from "../../Hooks/useHistory";

export const TransictionHistory = () => {
  const { data } = useHistory();
  console.log(data);
  return (
    <div>
      TransictionHistory
      <SectionHeader heading="Transition History" />
      <div className="overflow-auto">
        <table className="table-auto w-full min-w-[600px] ">
          <thead>
            <tr className="text-left text-white font-bold">
              <th>Receiver Number</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
              <th>Time</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-white space-y-4">
            <tr className="border-b border-blue-gray-600 *:p-2">
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr className="border-b border-blue-gray-600 *:p-2">
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr className="border-b border-blue-gray-600 *:p-2">
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
