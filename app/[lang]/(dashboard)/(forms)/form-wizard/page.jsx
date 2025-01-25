import Card from 'components/ui/card-snippet';
import BasicFormWizard from './basic-wizard';
import VStepForm from './vstep-form';

const FormLayout = () => {
  return (
    <div className="space-y-4">
      <Card title="Basic">
        <BasicFormWizard />
      </Card>
      <Card title="Validation"></Card>
      <Card title="Vertical">
        <VStepForm />
      </Card>
      <Card title="Custom"></Card>
    </div>
  );
};

export default FormLayout;
