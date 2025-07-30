'use client';
import { useOrderStore } from '@/app/stores/useOrderStore';
import { useRouter } from 'next/navigation';
export default function OrderSummary() {
    const router = useRouter();
    const { category, subcategory, sizeOrModel, file,price, setQuantity, quantity} = useOrderStore();
    const { step, setStep } = useOrderStore();
    

    const finalPrice = price * quantity;

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(e.target.value));
    };
    const handleBack = () => {
        const newStep = step > 1 ? ((step - 1) as 1 | 2 | 3) : 1;
        setStep(newStep);
    };
    const handlePaymentSubmit = async () => {
        router.push('/checkout');
       
    };
     
    // console.log("123")
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>
            <p className="text-lg text-gray-700">Confirm your order quantity and price.</p>

            <div className="border p-4 rounded-md bg-gray-50">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Order Details</h3>
                <p className="text-gray-600">
                    Product: {subcategory || 'N/A'} ({category || 'N/A'}, {sizeOrModel || 'N/A'})
                </p>
                <p className="text-gray-600">Image: {file ? file.name : 'Not uploaded'}</p>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor="quantity" className="text-gray-600">
                        Quantity:
                    </label>
                    <select
                        id="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="border rounded-md p-1 text-gray-600"
                    >
                        {[...Array(10).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="text-gray-600 mt-2">
                    Unit Price: ${price.toFixed(2)}
                </p>
                <p className="text-gray-600 font-semibold mt-2">
                    Final Price: ${finalPrice.toFixed(2)}
                </p>
            </div>
            <div className='flex gap-4 mt-2'>
                <button
                    onClick={handleBack}
                    className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Back
                </button>
                <button
                    onClick={handlePaymentSubmit}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Proceed to Checkout
                </button>
            </div>

        </div>
    );
}
