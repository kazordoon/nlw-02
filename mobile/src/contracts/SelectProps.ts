import { PickerProps } from "@react-native-community/picker/typings/Picker";

export default interface SelectProps extends PickerProps {
  items: {
    label: string;
    value: string;
  }[];
}
