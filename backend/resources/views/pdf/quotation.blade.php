<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Quotation {{ $quotation->quotation_number }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        h1, h2 { margin-bottom: 0; }
    </style>
</head>
<body>
    <h1>Quotation #{{ $quotation->quotation_number }}</h1>
    <h2>Date: {{ $quotation->quotation_date }}</h2>

    <h3>Customer</h3>
    <p>
        {{ $quotation->customer->name }}<br />
        {{ $quotation->customer->email }}<br />
        {{ $quotation->customer->phone }}<br />
        {{ $quotation->customer->address }}
    </p>

    <h3>Items</h3>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price (per unit)</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($quotation->items as $item)
                <tr>
                    <td>{{ $item->product->name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ number_format($item->price, 2) }}</td>
                    <td>{{ number_format($item->subtotal, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h3>Total: {{ number_format($quotation->total, 2) }}</h3>

    @if($quotation->notes)
        <h4>Notes</h4>
        <p>{{ $quotation->notes }}</p>
    @endif
</body>
</html>
